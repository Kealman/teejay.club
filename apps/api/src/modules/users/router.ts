import * as prodedures from "./procedures";

import { t } from "@/trpc";


export const router = t.router(prodedures);
