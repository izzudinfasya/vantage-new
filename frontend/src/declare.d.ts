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
declare global {
  interface Window {
    snap: any; // Deklarasi snap dengan tipe any
  }
}

export {}; // Untuk menjadikan file ini sebagai modul
