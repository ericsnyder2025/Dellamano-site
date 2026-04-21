import ServiceStub, { stubMetadata } from "@/components/ServiceStub";

export const metadata = stubMetadata("home-remodeling");
export default function Page() {
  return <ServiceStub slug="home-remodeling" />;
}
