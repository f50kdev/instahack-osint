import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ProfileCard from "./components/ProfileCard";
import GeoMap from "./components/GeoMap";
import ActivityChart from "./components/ActivityChart";
import DomainAnalysis from "./components/DomainAnalysis";
import EmailFinder from "./components/EmailFinder";
import PhoneLookup from "./components/PhoneLookup";
import InstagramInvestigator from "./components/InstagramInvestigator";
import ReportExporter from "./components/ReportExporter";

const MOCK_PROFILE = {
  name: "Bruno Fraga",
  user: "@username",
  posts: 20,
  followers: 1540,
  following: 320,
  location: "São Paulo, Brazil",
  timezone: "GMT-3 (Brazil)",
  activityPeak: "2:00 PM - 4:00 PM",
  coordinates: [
    { city: "São Paulo", coords: [-23.55052, -46.633308] },
    { city: "Rio de Janeiro", coords: [-22.906847, -43.172896] },
    { city: "Belo Horizonte", coords: [-19.916681, -43.934493] },
    { city: "Curitiba", coords: [-25.428954, -49.267137] },
  ],
  activityData: {
    labels: ["00h", "04h", "08h", "12h", "16h", "20h"],
    values: [5, 10, 15, 25, 18, 8],
  },
};

function App() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    // Simula busca OSINT
    setProfile({ ...MOCK_PROFILE, user: `@${username}` });
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <input
                type="text"
                placeholder="Buscar @username..."
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/^@/, ""))}
                className="bg-gray-800 text-gray-100 px-4 py-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded font-semibold shadow transition"
              >
                Buscar
              </button>
            </form>
            {profile && (
              <>
                <ProfileCard profile={profile} />
                <GeoMap />
                <ActivityChart activityData={profile.activityData} />
              </>
            )}
            {!profile && (
              <div className="text-gray-400 text-center mt-32 text-lg">
                Digite um username e clique em Buscar para simular uma análise OSINT.
              </div>
            )}
          </>
        );
      
      case "domain":
        return <DomainAnalysis />;
      
      case "email":
        return <EmailFinder />;
      
      case "phone":
        return <PhoneLookup />;
      
      case "instagram":
        return <InstagramInvestigator />;
      
      case "geo":
        return (
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">🌍 Geolocation Intelligence</h2>
            <GeoMap />
            <div className="mt-6 bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">📍 Funcionalidades:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Mapeamento de localizações</li>
                <li>• Análise de padrões geográficos</li>
                <li>• Integração com APIs de geolocalização</li>
              </ul>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-gray-400 text-center mt-32 text-lg">
            Selecione uma seção no menu lateral.
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-950 min-h-screen flex flex-col md:flex-row">
      <Sidebar onSectionChange={setActiveSection} activeSection={activeSection} />
      <main className="flex-1 md:ml-64 p-2 sm:p-4 md:p-8 w-full max-w-full">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">F50HACK - OSINT Dashboard</h1>
          <p className="text-gray-400 text-sm md:text-base">Ferramenta avançada de inteligência de fontes abertas</p>
        </div>
        {renderSection()}
        <ReportExporter 
          profile={profile}
          domainInfo={null}
          emails={[]}
          phoneInfo={null}
        />
      </main>
    </div>
  );
}

export default App;
