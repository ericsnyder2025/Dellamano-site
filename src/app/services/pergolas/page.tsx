import ServiceStub, { stubMetadata } from "@/components/ServiceStub";

export const metadata = stubMetadata("pergolas");
export default function Page() {
  return <ServiceStub slug="pergolas" />;
}
