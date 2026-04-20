import ServiceStub, { stubMetadata } from "@/components/ServiceStub";

export const metadata = stubMetadata("plumbing");
export default function Page() {
  return <ServiceStub slug="plumbing" />;
}
