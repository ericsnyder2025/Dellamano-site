import ServiceStub, { stubMetadata } from "@/components/ServiceStub";

export const metadata = stubMetadata("electrical");
export default function Page() {
  return <ServiceStub slug="electrical" />;
}
