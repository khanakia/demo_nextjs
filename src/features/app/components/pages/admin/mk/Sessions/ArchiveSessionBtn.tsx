import React from "react";
import { Popconfirm, message } from "antd";
import cx from "classnames";
import gqlErrorFirstMessage from "packages/string-fns/gqlErrorFirstMessage";
import { useSpinner } from "src/features/bite/components";
import { getGqlClient } from "src/features/bite";
import { mutation_mk_adm_sessionArchive} from "src/features/app";

type FormProps = {
  id: string;
  onSubmit?: Function;
  className?: string;
};

export default function ArchiveSessionBtn(props: FormProps) {
  const { id, onSubmit, className="" } = props;

  const spinner = useSpinner();

  const handleSubmit = () => {
    if(!id) return
    let gqlInput = {};
    let mutation = mutation_mk_adm_sessionArchive;
    gqlInput = {
      id: id,
    };
    spinner?.show ();
    getGqlClient()
      .request(mutation, gqlInput)
      .then((res) => {
        // console.log(res);
        message.success("Archived successfully.");

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
          <button className={cx("btn btn-danger btn-sm", className)} type="button">Archive Session</button>
        </Popconfirm>
    </>
  );
}
