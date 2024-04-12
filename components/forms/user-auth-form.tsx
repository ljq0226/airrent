"use client";
import { registerLandlord } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { get, post } from "@/lib";
import { Label } from "@radix-ui/react-label";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();
  const submit = async () => {
    try {
      const { code, msg } = isRegister
        ? await post("landlord/register", {
            username,
            password,
          })
        : await post("landlord", {
            username,
            password,
          });
      if (code == 200) {
        router.push("/cms");
      } else {
        console.log(msg);
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {isRegister ? "注册" : "登录"}
          </h1>
        </div>
        <form>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="username">用户名</Label>
            <Input
              value={username}
              type="text"
              id="username"
              placeholder="请输入用户名"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="grid my-2 w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="pasword">密码</Label>
            <Input
              value={password}
              type="pasword"
              id="pasword"
              placeholder="请输入密码"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </form>
        <div>
          <Button className="w-full" onClick={submit}>
            {" "}
            {isRegister ? "注册" : "登录"}
          </Button>
        </div>
        <div className="px-8 text-sm text-center text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <div
            className="underline cursor-pointer underline-offset-4 hover:text-primary"
            onClick={() => {
              setIsRegister(!isRegister);
            }}
          >
            {isRegister ? "去登录" : "没有账号?去注册"}
          </div>
        </div>
      </div>
    </>
  );
}
