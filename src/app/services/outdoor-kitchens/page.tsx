import ServiceStub, { stubMetadata } from "@/components/ServiceStub";

export const metadata = stubMetadata("outdoor-kitchens");
export default function Page() {
  return <ServiceStub slug="outdoor-kitchens" />;
}
