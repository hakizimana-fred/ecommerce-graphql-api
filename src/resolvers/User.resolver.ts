import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { MyContext } from "../types";

@Resolver()
export class UserResolver {
  @Mutation(() => Boolean)
  async signin(
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { prisma }: MyContext,
  ) {
    // check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) throw new Error("User already exists");

    //const hashedPassword = await argon2.hash(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    return true;
  }

  @Mutation(() => Boolean)
  signup() {
    return true;
  }
}
