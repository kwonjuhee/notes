import { SideBar } from "./components/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SideBar />
      {children}
    </>
  );
}
