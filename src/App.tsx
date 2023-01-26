import { AppProvider } from "./context/AppContext"
import Layout from "./Layout"
import Home from "./pages/Home"



function App() {

  return (
    <AppProvider>
      <Layout>
        <Home />
      </Layout>
    </AppProvider>
  )
}

export default App
