import ServiceStub, { stubMetadata } from "@/components/ServiceStub";

export const metadata = stubMetadata("home-additions");
export default function Page() {
  return <ServiceStub slug="home-additions" />;
}
