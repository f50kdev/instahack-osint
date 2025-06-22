import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

const DEFAULT_CENTER = [-15.77972, -47.92972];
const DEFAULT_ZOOM = 4.5;

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function ChangeMapView({ coords }) {
  const map = useMap();
  if (coords) {
    map.setView(coords, 14);
  }
  return null;
}

const GeoMap = () => {
  const [search, setSearch] = useState("");
  const [coords, setCoords] = useState(null);
  const [photoData, setPhotoData] = useState(null);
  const [progress, setProgress] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);

  // Busca localidade pelo nome
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;
    try {
      const resp = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`
      );
      const data = await resp.json();
      if (data && data.length > 0) {
        setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      }
    } catch (err) {
      console.error("Erro ao buscar local.", err);
    }
  };

  // Extrai EXIF da foto e faz análise profunda via backend
  const handlePhoto = async (e) => {
    setPhotoData(null);
    setCoords(null);
    setProgress(0);
    setAnalyzing(true);

    const file = e.target.files[0];
    if (!file) return;

    // Simula progresso visual enquanto faz upload/análise
    let prog = 0;
    let interval = setInterval(() => {
      prog += Math.floor(Math.random() * 20) + 10;
      setProgress((old) => {
        const next = Math.min(90, prog);
        return next;
      });
    }, 200);

    // Faz upload para o backend
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3001/analyze-image", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Erro ao analisar imagem");
      const result = await response.json();

      // Atualiza localização se houver GPS
      if (result.gps && result.gps.lat && result.gps.lon) {
        setCoords([result.gps.lat, result.gps.lon]);
      }

      setPhotoData(result);
      setProgress(100);
      setTimeout(() => setAnalyzing(false), 400);
    } catch (err) {
      console.error("Erro ao analisar imagem: ", err.message);
      setAnalyzing(false);
    } finally {
      clearInterval(interval);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Pesquise um lugar (cidade, país, endereço...)"
          className="flex-1 px-4 py-2 rounded border border-gray-300 focus:ring focus:ring-blue-400"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Buscar</button>
      </form>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Carregar foto para extrair localização e metadados:</label>
        <input type="file" accept="image/*" onChange={handlePhoto} />
      </div>
      {analyzing && (
        <div className="w-full bg-gray-200 rounded-full h-6 mb-4 overflow-hidden">
          <div
            className="bg-blue-600 h-6 text-white flex items-center justify-center text-sm font-semibold transition-all duration-300"
            style={{ width: `${progress}%` }}
          >
            {progress < 100 ? `Analisando... ${progress}%` : 'Finalizando...'}
          </div>
        </div>
      )}
      {!analyzing && photoData && (
        <div className="bg-white/10 backdrop-blur-md p-4 rounded mb-4 text-sm">
          <div><b>Modelo da câmera:</b> {photoData.camera_info && (photoData.camera_info["Image Model"] || photoData.camera_info["Image Make"] || "Desconhecido")}</div>
          <div><b>Data/Hora:</b> {photoData.datetime || "Desconhecida"}</div>
          <div><b>Localização GPS:</b> {photoData.gps && photoData.gps.lat && photoData.gps.lon
            ? `${photoData.gps.lat.toFixed(6)}, ${photoData.gps.lon.toFixed(6)}`
            : "Não disponível"}</div>
          <div><b>Endereço detectado:</b> {photoData.detected_location || "Não disponível"}</div>
          <div><b>Descrição da imagem (IA):</b> {photoData.image_description || "Não disponível"}</div>
          <div><b>Texto extraído (OCR):</b> {photoData.ocr_text || "Nenhum texto encontrado"}</div>
          <div><b>Idioma do texto:</b> {photoData.ocr_language || "Não detectado"}</div>
          <div><b>Hash da imagem:</b> <span className="break-all">{photoData.hash}</span></div>
          <div><b>Sombras:</b> {photoData.shadow_info || "Não analisado"}</div>
          <div><b>Busca reversa:</b> <a href={photoData.search_matches?.google_reverse_image} target="_blank" rel="noopener noreferrer">Google Reverse Image</a></div>
          <div className="text-xs text-gray-400 mt-2">Analisado em: {photoData.analyzed_at}</div>
        </div>
      )}
      <div className="w-full h-96 rounded-lg overflow-hidden shadow-md">
        <MapContainer
          center={coords || DEFAULT_CENTER}
          zoom={coords ? 14 : DEFAULT_ZOOM}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {coords && (
            <Marker position={coords}>
              <Popup>
                {photoData && photoData.latitude && photoData.longitude ? (
                  <span>
                    <b>Foto tirada aqui</b><br />
                    Modelo: {photoData.model}<br />
                    Data/Hora: {photoData.date}
                  </span>
                ) : (
                  <span>Local pesquisado</span>
                )}
              </Popup>
            </Marker>
          )}
          {coords && <ChangeMapView coords={coords} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default GeoMap; 