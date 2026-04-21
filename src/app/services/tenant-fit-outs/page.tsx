import ServiceStub, { stubMetadata } from "@/components/ServiceStub";

export const metadata = stubMetadata("tenant-fit-outs");
export default function Page() {
  return <ServiceStub slug="tenant-fit-outs" />;
}
