import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <>

      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout