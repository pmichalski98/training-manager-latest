import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import z from "zod";
import { TRPCError } from "@trpc/server";

export const bodyRouter = createTRPCRouter({});
