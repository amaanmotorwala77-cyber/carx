import { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Configurator from "./components/Configurator";
import Garage from "./components/Garage";
import AIDesignLab from "./components/AIDesignLab";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";
import ChatBot from "./components/ChatBot";
import Footer from "./components/Footer";
import { auth, onAuthStateChanged, User, db, doc, getDoc, setDoc, serverTimestamp } from "./firebase";
import { Loader2 } from "lucide-react";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed:", currentUser?.email);
      
      if (!currentUser) {
        setUser(null);
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      // Update UI immediately with what we know
      setUser(currentUser);
      setIsAdmin(currentUser.email === "amaanmotorwala77@gmail.com");
      setIsLoading(false);

      // Background sync with Firestore
      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        let role = "user";
        if (currentUser.email === "amaanmotorwala77@gmail.com") {
          role = "admin";
        }

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            role: role,
            createdAt: serverTimestamp()
          });
        } else {
          const existingData = userSnap.data();
          if (currentUser.email === "amaanmotorwala77@gmail.com" && existingData.role !== "admin") {
            role = "admin";
            await setDoc(userRef, { 
              ...existingData, 
              role: "admin",
              updatedAt: serverTimestamp()
            }, { merge: true });
          } else {
            role = existingData.role;
          }
        }
        
        // Final update with correct role from Firestore if needed
        setIsAdmin(role === "admin");
      } catch (error) {
        console.error("Firestore sync error:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={setCurrentPage} user={user} />;
      case "configurator":
        return <Configurator onComplete={() => setCurrentPage("garage")} />;
      case "garage":
        return user ? <Garage onNavigate={setCurrentPage} /> : <Login onNavigate={setCurrentPage} />;
      case "ai-lab":
        return user ? <AIDesignLab /> : <Login onNavigate={setCurrentPage} />;
      case "admin":
        return isAdmin ? <AdminDashboard /> : <Login onNavigate={setCurrentPage} />;
      case "login":
        return user ? <Home onNavigate={setCurrentPage} user={user} /> : <Login onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} user={user} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-white/50 font-bold uppercase tracking-widest text-xs">Initializing Systems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark text-white selection:bg-primary/30 selection:text-primary flex flex-col">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} user={user} isAdmin={isAdmin} />
      <main className="flex-1 flex flex-col">
        {renderPage()}
      </main>
      <ChatBot />
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}
