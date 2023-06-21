import Header from "../components/Header"
import Modal from "../components/Modal"
import SettingsModal from "../components/SettingsModal"

export default function ProjectsLayout({
  children,
}) {
  return (
    <main>
      <Header />
      {children}
      <Modal />
      <SettingsModal />
    </main>
  )
}
