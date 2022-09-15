import { useQuery } from "react-query";
import { getGqlClient } from "src/features/bite";
import { TDataGrid } from "src/features/bite";
import isBlank from "packages/string-fns/isBlank"

import {
  query_me,
  query_p_user,
  query_p_paymentMethods,
  query_p_paymentMethod,
  query_p_paymentRequests,
  query_p_paymentRequest,
  query_p_paymentRequestByChild,
  query_p_paymentRequestsByChilds,
  query_p_ledgers,
  query_p_ledgerBalanceByChilds,
  query_p_legerBalance,
  query_mk_adm_channels,
  query_mk_adm_channel,
  query_mk_p_sessions,
  query_mk_p_session,
  query_mk_p_sessionEntries,
  query_mk_agent_totalBetForEachChild,
  query_mk_adm_totalBetForEachChild,
  query_mk_p_jantri,
  query_mk_adm_jantri,
  query_mk_agent_jantri,
  query_pub_company,
} from "../schema";

export function userQueryMe() {
  return useQuery(
    ["me"],
    async (ctx) => {
      const { me: data } = await getGqlClient().request(
        query_me
      );
      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      // staleTime: 10000,
      keepPreviousData: true,
    }
  );
}

export function useQueryUser(vars: { id: string }) {
  const enabled = isBlank(vars.id) ? false : true;

  return useQuery(
    ["user", vars],
    async (ctx) => {
      const { p_user: data } = await getGqlClient().request(
        query_p_user,
        vars
      );
      return data;
    },
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
    }
  );
}

export function useQueryPaymentMethods() {
  return useQuery(
    ["paymentMethods"],
    async (ctx) => {
      const { p_paymentMethods: data } = await getGqlClient().request(
        query_p_paymentMethods,
        ctx.queryKey[1]
      );
      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      // staleTime: 10000,
      keepPreviousData: true,
    }
  );
}

export function useQueryPaymentMethod(vars: { id: string }) {
  const enabled = isBlank(vars.id) ? false : true;

  return useQuery(
    ["paymentMethod", vars],
    async (ctx) => {
      const { p_paymentMethod: data } = await getGqlClient().request(
        query_p_paymentMethod,
        vars
      );
      return data;
    },
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
    }
  );
}

export function useQueryLedgers(vars?: TDataGrid) {
  return useQuery(
    ["ledgers", vars],
    async (ctx) => {
      const { p_ledgers: data } = await getGqlClient().request(
        query_p_ledgers,
        vars
      );
      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      // staleTime: 10000,
      keepPreviousData: true,
    }
  );
}

export function useQueryLedgerBalanceByChilds(vars?: TDataGrid) {
  return useQuery(
    ["ledgerBalanceByChilds", vars],
    async (ctx) => {
      const { p_ledgerBalanceByChilds: data } = await getGqlClient().request(
        query_p_ledgerBalanceByChilds,
        vars
      );
      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      // staleTime: 10000,
      keepPreviousData: true,
    }
  );
}

export function useQueryLedgerBalance() {
  return useQuery(
    ["ledgerBalance"],
    async (ctx) => {
      const { p_legerBalance: data } = await getGqlClient().request(
        query_p_legerBalance
      );
      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      // staleTime: 10000,
      keepPreviousData: true,
    }
  );
}

export function useQueryPaymentRequests(vars?: TDataGrid) {
  return useQuery(
    ["paymentRequests", vars],
    async (ctx) => {
      const { p_paymentRequests: data } = await getGqlClient().request(
        query_p_paymentRequests,
        vars
      );
      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      // staleTime: 10000,
      keepPreviousData: true,
    }
  );
}

export function useQueryPaymentRequest(vars: { id: string }) {
  const enabled = isBlank(vars.id) ? false : true;

  return useQuery(
    ["paymentRequest", vars],
    async (ctx) => {
      const { p_paymentRequest: data } = await getGqlClient().request(
        query_p_paymentRequest,
        vars
      );
      return data;
    },
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
    }
  );
}

export function useQueryPaymentRequestByChild(vars: { id: string }) {
  const enabled = isBlank(vars.id) ? false : true;

  return useQuery(
    ["paymentRequestByChild", vars],
    async (ctx) => {
      const { p_paymentRequestByChild: data } = await getGqlClient().request(
        query_p_paymentRequestByChild,
        vars
      );
      return data;
    },
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
    }
  );
}

export function useQueryPaymentRequestsByChilds(vars?: TDataGrid) {
  return useQuery(
    ["paymentRequestsByChilds", vars],
    async (ctx) => {
      const { p_paymentRequestsByChilds: data } = await getGqlClient().request(
        query_p_paymentRequestsByChilds,
        vars
      );
      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      // staleTime: 10000,
      keepPreviousData: true,
    }
  );
}

export function useQueryMkAdmChannels() {
  return useQuery(
    ["mkAdminChannels"],
    async (ctx) => {
      const { mk_adm_channels: data } = await getGqlClient().request(
        query_mk_adm_channels,
        // vars
      );
      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      // staleTime: 10000,
      keepPreviousData: true,
    }
  );
}


export function useQueryMkAdmChannel(vars: { id: string }) {
  const enabled = isBlank(vars.id) ? false : true;

  return useQuery(
    ["mkAdmChannel", vars],
    async (ctx) => {
      const { mk_adm_channel: data } = await getGqlClient().request(
        query_mk_adm_channel,
        vars
      );
      return data;
    },
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
    }
  );
}

export function useQueryMkSessions(vars?: TDataGrid) {
  return useQuery(
    ["mkSessions", vars],
    async (ctx) => {
      const { mk_p_sessions: data } = await getGqlClient().request(
        query_mk_p_sessions,
        vars
      );
      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      // staleTime: 10000,
      keepPreviousData: true,
    }
  );
}

export function useQueryMkSession(vars: { id: string }) {
  const enabled = isBlank(vars.id) ? false : true;

  return useQuery(
    ["mkSession", vars],
    async (ctx) => {
      const { mk_p_session: data } = await getGqlClient().request(
        query_mk_p_session,
        vars
      );
      return data;
    },
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
    }
  );
}

export function useQueryMkSessionEntries(vars?: TDataGrid) {
  return useQuery(
    ["mkSessionEntries", vars],
    async (ctx) => {
      const { mk_p_sessionEntries: data } = await getGqlClient().request(
        query_mk_p_sessionEntries,
        vars
      );
      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      // staleTime: 10000,
      keepPreviousData: true,
    }
  );
}

export function useQueryMkAgentTotalBetForEachChild(vars?: TDataGrid) {
  return useQuery(
    ["mkSessionEntries", vars],
    async (ctx) => {
      const { mk_agent_totalBetForEachChild: data } = await getGqlClient().request(
        query_mk_agent_totalBetForEachChild,
        vars
      );
      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      // staleTime: 10000,
      keepPreviousData: true,
    }
  );
}

export function useQueryMkAdmTotalBetForEachChild(vars?: TDataGrid) {
  return useQuery(
    ["mkSessionEntries", vars],
    async (ctx) => {
      const { mk_adm_totalBetForEachChild: data } = await getGqlClient().request(
        query_mk_adm_totalBetForEachChild,
        vars
      );
      return data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      // staleTime: 10000,
      keepPreviousData: true,
    }
  );
}

// type MkPJantriInput = {
//   sessionId: tring
//   userId: string
// }

type MkJantriInput = {
  sessionId: string
}

export function useQueryMkJantri(vars: {input: MkJantriInput}) {
  const enabled = isBlank(vars.input.sessionId) ? false : true;

  return useQuery(
    ["mkJantri", vars],
    async (ctx) => {
      const { mk_p_jantri: data } = await getGqlClient().request(
        query_mk_p_jantri,
        vars
      );
      return data;
    },
    {
      enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      // staleTime: 10000,
      keepPreviousData: true,
    }
  );
}

type MkAdmJantriInput = {
  sessionId: string
  parentId?: string
  userId?: string
  parentPhone?: string
  userPhone?: string
}

export function useQueryMkAdminJantri(vars: {input: MkAdmJantriInput}) {
  const enabled = isBlank(vars.input.sessionId) ? false : true;

  return useQuery(
    ["mkAdminJantri", vars],
    async (ctx) => {
      const { mk_adm_jantri: data } = await getGqlClient().request(
        query_mk_adm_jantri,
        vars
      );
      return data;
    },
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      // staleTime: 10000,
      keepPreviousData: true,
    }
  );
}

type MkAggentJantriInput = {
  sessionId: string
  userId?: string
  userPhone?: string
}

export function useQueryMkAgentJantri(vars: {input: MkAggentJantriInput}) {
  const enabled = isBlank(vars.input.sessionId) ? false : true;

  return useQuery(
    ["mkAgentJantri", vars],
    async (ctx) => {
      const { mk_agent_jantri: data } = await getGqlClient().request(
        query_mk_agent_jantri,
        vars
      );
      return data;
    },
    {
      enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      // staleTime: 10000,
      keepPreviousData: true,
    }
  );
}