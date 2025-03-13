"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useSession } from "next-auth/react"

import { SettingsSchema } from "@/schemas";

import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { settings } from "@/actions/settings";
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const SettingsPage = () => {
    const { update } = useSession();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues:{
            name: ""
        }
    });

    const onClick = () => {
        startTransition(() => {
        settings({
            name: "Novo Nome!"
        })
        .then(() =>{
            update();
        })
    })
    }

    return ( 
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Configurações
                </p>
            </CardHeader>
            <CardContent>
                <Button disabled={isPending} onClick={onClick}>
                    Atualizar Nome
                </Button>
            </CardContent>
        </Card>
     );
}
 
export default SettingsPage;