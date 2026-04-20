import ServiceStub, { stubMetadata } from "@/components/ServiceStub";

export const metadata = stubMetadata("pool-construction");
export default function Page() {
  return <ServiceStub slug="pool-construction" />;
}
