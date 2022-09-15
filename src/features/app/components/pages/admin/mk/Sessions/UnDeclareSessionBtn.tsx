import React, { useState, useEffect } from "react";
import { Popconfirm, message } from "antd";
import gqlErrorFirstMessage from "packages/string-fns/gqlErrorFirstMessage";
import { useSpinner } from "src/features/bite/components";
import { getGqlClient } from "src/features/bite";
import { mutation_mk_adm_unDeclareSession} from "src/features/app";

type Props = {
  id: string;
  onSubmit?: Function;
};

export default function UnDeclareSessionBtn(props: Props) {
  const { id, onSubmit } = props;

  const spinner = useSpinner();

  const handleSubmit = () => {
    if(!id) return
    let gqlInput = {};
    let mutation = mutation_mk_adm_unDeclareSession;
    gqlInput = {
      id,
    };
    spinner?.show ();
    getGqlClient()
      .request(mutation, gqlInput)
      .then((res) => {
        // console.log(res);
        message.success("Declared successfully.");

        if (typeof onSubmit == "function") {
          onSubmit();
        }
      })
      .catch((err) => {
        // console.log(err);
        const msg = gqlErrorFirstMessage(err, {
          capitalize: true,
        });
        message.error(msg);
      })
      .finally(() => {
        spinner?.hide();
      });
  };

  return (
    <>
      <Popconfirm
        title="Are you sure?"
        onConfirm={handleSubmit}
        // onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <button className="btn btn-danger btn-sm" type={"button"}>UnDeclare Session</button>
      </Popconfirm>
    </>
  );
}
