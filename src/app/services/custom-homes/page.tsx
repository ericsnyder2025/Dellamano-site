import ServiceStub, { stubMetadata } from "@/components/ServiceStub";

export const metadata = stubMetadata("custom-homes");
export default function Page() {
  return <ServiceStub slug="custom-homes" />;
}
