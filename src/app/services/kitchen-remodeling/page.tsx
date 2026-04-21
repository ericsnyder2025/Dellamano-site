import ServiceStub, { stubMetadata } from "@/components/ServiceStub";

export const metadata = stubMetadata("kitchen-remodeling");
export default function Page() {
  return <ServiceStub slug="kitchen-remodeling" />;
}
