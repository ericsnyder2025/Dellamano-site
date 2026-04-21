import ServiceStub, { stubMetadata } from "@/components/ServiceStub";

export const metadata = stubMetadata("generator-installation");
export default function Page() {
  return <ServiceStub slug="generator-installation" />;
}
