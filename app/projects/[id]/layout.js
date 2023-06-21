import Header from "@/app/components/Header"
import Modal from "@/app/components/Modal"
import SettingsModal from "@/app/components/SettingsModal"

export default function DynamicProjectsLayout({
  children,
}) {
  return (
    <>
      <Header />
      {children}
      <Modal />
      <SettingsModal />
    </>
  )
}
