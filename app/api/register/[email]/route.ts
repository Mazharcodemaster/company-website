
import { NextRequest,NextResponse } from "next/server"
import { prisma } from '@/db/config';
 export const GET=async(req:NextRequest,{params}:any)=>{
    console.log('email in api code',params.email)
    const email= params.email
    try {
      
    const res= await prisma.register.findUnique({where:{email}})
    return NextResponse.json({message:'Admin data fetch successfully',res},{status:200})
  
      
      
    } catch (error) {
      return NextResponse.json({message:'Error in get all employee'},{status:500})
    }
  }

  export const DELETE=async(req:NextRequest,{params}:any)=>{
    const email=params.email
    try {
        const res= await prisma.register.delete({where:{email}})
        return NextResponse.json({message:'Delete admin Successfully'},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Error in deleteing admin'},{status:500})
    }
  }