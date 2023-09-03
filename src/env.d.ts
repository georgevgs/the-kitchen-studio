/// <reference path="../.astro/types.d.ts" />
/// <reference types="@astrojs/image/client" />

declare module "*.avif" {
  const content: string;
  export default content;
}
  