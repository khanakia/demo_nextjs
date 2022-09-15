import Link from "next/link";
import moment from "moment";
import { get } from "@muft/dot";
import { ShowWrap, useSpinner } from "src/features/bite/components";
import { useUserRole, TUserRole, } from "src/features/auth";
import { useQueryMkSessions } from "src/features/app";
import { SessionStatus_UnDeclared } from "src/features/app/constant"

export default function List() {
  // const { user } = useAuth()
  const userRole = useUserRole();

  const { data=[], isFetching } = useQueryMkSessions({
    limit: 100,
    // offset: pageinfo.offset,
    // orderBy: pageinfo.orderBy,
    // filters: filters,
  });

  const items: any = get(data, "nodes", []);

  return (
    <>
    <h5>MK Sessions</h5>
    <div className="row-fluid">
      {items.map((item:any, i: number) => {
        const startTime = moment(item.startTime).format("lll")
        const endTime = moment(item.endTime).format("lll")
        return (
          <div key={i} className="card col-md-3">
            <div className="card-body">
              <h5 className="card-title">{item.channelName} - {item.name}</h5>
              <div><strong>Start Time:</strong> {startTime}</div>
              <div><strong>End Time:</strong> {endTime}</div>

              <ShowWrap show={item?.statusId == SessionStatus_UnDeclared}>
                <Link href={`/member/mk/sessions/${item.id}/place_bet`}>
                  <a className="btn btn-dark w-100 mb-2 mt-3">Place Bet</a>
                </Link>
              </ShowWrap>

              <Link href={`/member/mk/sessions/${item.id}/jantri`}>
                <a className="btn btn-dark w-100">View Jantri</a>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
      
    </>
  );
}
