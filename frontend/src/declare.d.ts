declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.gif";
declare module "*.GIF";
declare module "*.webm";
declare module "*.mp4";
declare module "*.mp3" {
  const src: string;
  export default src;
}
