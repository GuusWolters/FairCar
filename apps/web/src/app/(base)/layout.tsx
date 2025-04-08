import { Footer } from "@/components/global/footer";
import { Header } from "@/components/global/header";
import { PropsWithChildren } from "react";

const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default BaseLayout;
