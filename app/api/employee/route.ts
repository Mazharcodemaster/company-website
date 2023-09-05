import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/db/config';

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, code, salary, address,image } = await req.json();
    //  console.log('form data',name,email,password,salary,address,image)
     const isAddedEmployee= await prisma.employee.findUnique({where:{email}})
     if(isAddedEmployee){
      return NextResponse.json({message:'Already Employee Add'},{status:200})
     }
    const employee = await prisma.employee.create({
      data: {
        name,
        email,
        code,
        salary,
        address,
        image
      },
    });

    return NextResponse.json(
      { message: 'Create Employee successfully', employee },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error in create employee' },
      { status: 500 }
    );
  }
};



export const GET=async(req:NextRequest,context:{params:any})=>{
  try {
    
  const res= await prisma.employee.findMany()

  return NextResponse.json({message:'Employee data fetch succesfully',res},{status:200})

    
    
  } catch (error) {
    return NextResponse.json({message:'Error in get all employee'},{status:500})
  }
}
export const DELETE=async(req:NextRequest)=>{
  try {
    const {email}=await req.json()
    console.log('email in delete api',email)
    const res=await prisma.employee.delete({where:{email}});
    return NextResponse.json({message:'Delete employee successfully'},{status:200}) 
    }
   catch (error) {
    console.log('error in delete employee',error)
    return NextResponse.json({message:'Error in delete employee'},{status:500})
  }
}
export const PUT = async (req: NextRequest) => {
  try {
    const { id, updateName, updateEmail, updateSalary, updateAddress } = await req.json();

    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: {
        name: updateName,
        email: updateEmail,
        salary: updateSalary,
        address: updateAddress,
      },
    });

    return NextResponse.json(
      { message: 'Employee updated successfully', updatedEmployee },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating employee', error },
      { status: 500 }
    );
  }
};
