import { Card, CardContent } from "@/components/ui/card"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Image from "next/image"

export default function Home() {
  return (     
    <div className="flex flex-col justify-evenly h-screen">
      <h1 className="text-center">Water Tank Monitoring System</h1>
        <div className="flex justify-evenly">
          <Image src="/tong1.jpg" alt="tong 1" height={300} width={400}/>
          <Image src="/tong2.jpg" alt="tong 2" height={300} width={400}/>
          <Image src="/tong3.jpg" alt="tong 3" height={300} width={400}/>      
        </div>        
    </div>
  )
}
      