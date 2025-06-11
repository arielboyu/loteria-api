import prisma from "../config/prisma";



export const existsMail = async ( email: string ) => {

  const existingUser = await prisma.user.findUnique( {
    where: { email }
  } );

  if( existingUser ){
    throw Error( "Este email ya está registrado." );
  }
};


