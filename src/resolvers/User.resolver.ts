import { Mutation, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
  @Mutation(() => Boolean)
  signin() {
    return true;
  }

  @Mutation(() => Boolean)
  signup() {
    return true;
  }
}
