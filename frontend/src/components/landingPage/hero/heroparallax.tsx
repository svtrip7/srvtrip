"use client";
import { HeroParallax } from "../../ui/hero-parallax";

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}
export const products = [
  {
    title: "Santorini, Greece",
    link: "https://en.wikipedia.org/wiki/Santorini",
    thumbnail: "https://images.unsplash.com/photo-1503152394-c571994fd383?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FudG9yaW5pJTIwZ3JlZWNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Kyoto, Japan",
    link: "https://en.wikipedia.org/wiki/Kyoto",
    thumbnail: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a3lvdG8lMjBqYXBhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Banff National Park, Canada",
    link: "https://en.wikipedia.org/wiki/Banff_National_Park",
    thumbnail: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuZmYlMjBuYXRpb25hbCUyMHBhcmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Taj Mahal, India",
    link: "https://en.wikipedia.org/wiki/Taj_Mahal",
    thumbnail: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Cappadocia, Turkey",
    link: "https://en.wikipedia.org/wiki/Cappadocia",
    thumbnail: "/parallaximages/image1.jpg",
  },
  {
    title: "Amalfi Coast, Italy",
    link: "https://en.wikipedia.org/wiki/Amalfi_Coast",
    thumbnail: "/parallaximages/image3.jpg",
  },
  {
    title: "Machu Picchu, Peru",
    link: "https://en.wikipedia.org/wiki/Machu_Picchu",
    thumbnail: "https://images.unsplash.com/photo-1500581276021-a4bbcd0050c5?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Sahara Desert, Morocco",
    link: "https://en.wikipedia.org/wiki/Sahara",
    thumbnail: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FoYXJhJTIwZGVzZXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "New York, USA",
    link: "https://en.wikipedia.org/wiki/USA",
    thumbnail: "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?q=80&w=2071&auto=format&fit=crops",
  },
  {
    title: "Iceland Northern Lights",
    link: "https://en.wikipedia.org/wiki/Aurora",
    thumbnail: "/parallaximages/image10.jpg",
  },
  // New entries below
  {
    title: "Rio de Janeiro, Brazil",
    link: "https://en.wikipedia.org/wiki/Rio_de_Janeiro",
    thumbnail: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmlvJTIwZGUlMjBqYW5laXJvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Maldives",
    link: "https://en.wikipedia.org/wiki/Maldives",
    thumbnail: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZGl2ZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Barcelona, Spain",
    link: "https://en.wikipedia.org/wiki/Barcelona",
    thumbnail: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Bangkok, Thailand",
    link: "https://en.wikipedia.org/wiki/Eiffel_Tower",
    thumbnail: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "Angkor Wat, Cambodia",
    link: "https://en.wikipedia.org/wiki/Angkor_Wat",
    thumbnail: "/parallaximages/image2.jpg",
  },
  // {
  //   title: "Fiordland, New Zealand",
  //   link: "https://en.wikipedia.org/wiki/Fiordland_National_Park",
  //   thumbnail: "https://images.unsplash.com/photo-1574524096795-455892e9a6d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmhvcmRsYW5kJTIwbmV3JTIwemVhbGFuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80",
  // },
  // {
  //   title: "Petra, Jordan",
  //   link: "https://en.wikipedia.org/wiki/Petra",
  //   thumbnail: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGV0cmElMjBqb3JkYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80",
  // },
  // {
  //   title: "Bali, Indonesia",
  //   link: "https://en.wikipedia.org/wiki/Bali",
  //   thumbnail: "https://images.unsplash.com/photo-1539368447531-05d2a6d4c954?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFsaSUyMGluZG9uZXNpYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80",
  // },
  // {
  //   title: "Grand Canyon, USA",
  //   link: "https://en.wikipedia.org/wiki/Grand_Canyon",
  //   thumbnail: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhbmQlMjBjYW55b258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80",
  // },
  // {
  //   title: "Paris, France",
  //   link: "https://en.wikipedia.org/wiki/Paris",
  //   thumbnail: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFyaXMlMjBmcmFuY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80",
  // }
];


/* 
{
    title: "Santorini, Greece",
    link: "https://en.wikipedia.org/wiki/Santorini",
    thumbnail: "/parallaximages/image1.jpg",
  },
  {
    title: "Kyoto, Japan",
    link: "https://en.wikipedia.org/wiki/Kyoto",
    thumbnail: "/parallaximages/image2.jpg",
  },
  {
    title: "Banff National Park, Canada",
    link: "https://en.wikipedia.org/wiki/Banff_National_Park",
    thumbnail: "/parallaximages/image3.jpg",
  },
  {
    title: "Taj Mahal, India",
    link: "https://en.wikipedia.org/wiki/Taj_Mahal",
    thumbnail: "/parallaximages/image4.jpg",
  },
  {
    title: "Cappadocia, Turkey",
    link: "https://en.wikipedia.org/wiki/Cappadocia",
    thumbnail: "/parallaximages/image5.jpg",
  },
  {
    title: "Amalfi Coast, Italy",
    link: "https://en.wikipedia.org/wiki/Amalfi_Coast",
    thumbnail: "/parallaximages/image6.jpg",
  },
  {
    title: "Machu Picchu, Peru",
    link: "https://en.wikipedia.org/wiki/Machu_Picchu",
    thumbnail: "/parallaximages/image7.jpg",
  },
  {
    title: "Sahara Desert, Morocco",
    link: "https://en.wikipedia.org/wiki/Sahara",
    thumbnail: "/parallaximages/image8.jpg",
  },
  {
    title: "New York, USA",
    link: "https://en.wikipedia.org/wiki/USA",
    thumbnail: "/parallaximages/image9.jpg",
  },
  {
    title: "Iceland Northern Lights",
    link: "https://en.wikipedia.org/wiki/Aurora",
    thumbnail: "/parallaximages/image10.jpg",
  },
  // New entries below
  {
    title: "Rio de Janeiro, Brazil",
    link: "https://en.wikipedia.org/wiki/Rio_de_Janeiro",
    thumbnail: "/parallaximages/image11.jpg",
  },
  {
    title: "Maldives",
    link: "https://en.wikipedia.org/wiki/Maldives",
    thumbnail: "/parallaximages/image12.jpg",
  },
  {
    title: "Barcelona, Spain",
    link: "https://en.wikipedia.org/wiki/Barcelona",
    thumbnail: "/parallaximages/image13.jpg",
  },
  {
    title: "Bangkok, Thailand",
    link: "https://en.wikipedia.org/wiki/Eiffel_Tower",
    thumbnail: "/parallaximages/image14.jpg",
  },
  {
    title: "Angkor Wat, Cambodia",
    link: "https://en.wikipedia.org/wiki/Angkor_Wat",
    thumbnail: "/parallaximages/image15.jpg",
  },
  {
    title: "Fiordland, New Zealand",
    link: "https://en.wikipedia.org/wiki/Fiordland_National_Park",
    thumbnail: "/parallaximages/image16.jpg",
  },
  {
    title: "Petra, Jordan",
    link: "https://en.wikipedia.org/wiki/Petra",
    thumbnail: "/parallaximages/image17.jpg",
  },
  {
    title: "Bali, Indonesia",
    link: "https://en.wikipedia.org/wiki/Bali",
    thumbnail: "/parallaximages/image18.jpg",
  },
  {
    title: "Grand Canyon, USA",
    link: "https://en.wikipedia.org/wiki/Grand_Canyon",
    thumbnail: "/parallaximages/image19.jpg",
  },
  {
    title: "Paris, France",
    link: "https://en.wikipedia.org/wiki/Paris",
    thumbnail: "/parallaximages/image20.jpg",
  }
*/