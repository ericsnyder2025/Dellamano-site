import ServiceStub, { stubMetadata } from "@/components/ServiceStub";

export const metadata = stubMetadata("hardscapes");
export default function Page() {
  return <ServiceStub slug="hardscapes" />;
}
