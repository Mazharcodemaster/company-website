
import { NextRequest,NextResponse } from "next/server"
import { prisma } from '@/db/config';
 export const GET=async(req:NextRequest,{params}:any)=>{
    // console.log('email in api code',params.email)
    const email= params.email
    try {
      console.log('admin profile email',email)

    const res= await prisma.employee.findUnique({where:{email}})
    console.log('res',res)
    return NextResponse.json({message:'Employee data fetch succesfully',res},{status:200})
  
      
      
    } catch (error) {
      return NextResponse.json({message:'Error in get all employee'},{status:500})
    }
  }