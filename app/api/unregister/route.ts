import User from "@/models/user";
import {connectMongoDB} from "@/lib/mongodb";
import bcrypt from "bcrypt";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json();

  await connectMongoDB();

  const hashedPassword = await bcrypt.hash(password, 5);
  console.log("hashedPassword : ", hashedPassword); 


  const doc = await User.findOne({name: name });

  if(doc){
      console.log("Delete User : ", doc); 
      const passwordsMatch = await bcrypt.compare(password, doc.password);
      console.log("passwordsMatch : ", passwordsMatch); 
      if( (doc.email === email) && (passwordsMatch) ){
        await User.deleteOne({name: name });
        return new NextResponse("User has been deleted", {
          status: 201,
        })
      }
      else{
        console.log("email or password not correct"); 
        return new NextResponse("email or password not correct", {
          status: 500,
        })
      }
      
  }
  else{
      console.log("User not found") 
      return new NextResponse("User deleted failed", {
        status: 500,
      })

  }; 
    
    
};
