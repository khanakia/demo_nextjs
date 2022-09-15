import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQueryMkSession } from "src/features/app";
import FormNew from './FormNew'
import { ShowWrap, SimpleLoader } from "src/features/bite/components"
import { listPageLink, titleSingular } from "./constant"
import { SessionStatus_UnDeclared, SessionStatus_Declared } from "src/features/app/constant"
import moment from 'moment';
import UnDeclareSessionBtn from "./UnDeclareSessionBtn"
import ArchiveSessionBtn from "./ArchiveSessionBtn"
import StatusBadge from "./StatusBadge"

export default function SessionEdit() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useQueryMkSession({id: id as any});
  
  const handleSubmit = (redirect: boolean) => {
    if(!redirect) return
    router.push(`${listPageLink}`)
  }

  const data_ = {...data, ...{
    startTime: data?.startTime ? moment(data?.startTime) : moment(),
    endTime: data?.endTime ? moment(data?.endTime) : moment(),
  }}

  const handleChangeStatusSubmit = () => {
    router.push(`${listPageLink}`)
  }

  return (
    <>
      {isLoading ? <SimpleLoader overlay={true} /> : null}
      <h5>{titleSingular} <StatusBadge statusId={data?.statusId} /> </h5>
      
      <div className='mb-4 text-end'>
        <ShowWrap show={data?.statusId==SessionStatus_Declared}>
          <UnDeclareSessionBtn id={data?.id} onSubmit={handleChangeStatusSubmit} />
        </ShowWrap>
        <ShowWrap show={data?.statusId==SessionStatus_UnDeclared}>
          <Link href={`${listPageLink}/${id}/declare`}>
            <a className='btn btn-success btn-sm me-2'>Declare {titleSingular}</a>
          </Link>
          <ArchiveSessionBtn id={data?.id} className='ms-2' onSubmit={handleChangeStatusSubmit} />
        </ShowWrap>
      </div>
      
      <FormNew data={data_} id={id as any} onSubmit={handleSubmit} />
    </>
  );
}
