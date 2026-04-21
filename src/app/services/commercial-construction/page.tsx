import ServiceStub, { stubMetadata } from "@/components/ServiceStub";

export const metadata = stubMetadata("commercial-construction");
export default function Page() {
  return <ServiceStub slug="commercial-construction" />;
}
