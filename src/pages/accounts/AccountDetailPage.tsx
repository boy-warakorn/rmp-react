import Card from "@components/global/Card";
import OutlineButton from "@components/global/OutlineButton";
import {
  HeadingText3,
  HeadingText4,
} from "@components/global/typography/Typography";
import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import RepositoriesFactory from "@repository/RepositoryFactory";
import { AccountRepository } from "@repository/AccountRepository";
import { useDispatch, useSelector } from "react-redux";
import { accountSelector } from "@stores/accounts/selector";
import { setAccount } from "@stores/accounts/slice";
import Loading from "@components/global/Loading";
import RoleTag from "@components/feature/account/RoleTag";

const AccountDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const accountsRepository = RepositoriesFactory.get(
    "account"
  ) as AccountRepository;
  const accountsSelector = useSelector(accountSelector);

  useEffect(() => {
    fetchAccount();
    // eslint-disable-next-line
  }, []);

  const fetchAccount = async () => {
    try {
      setIsLoading(true);
      const account = await accountsRepository.getAccount(id);
      if (account) {
        dispatch(setAccount(account));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Fragment>
      <div className="col-span-12 mt-3 mb-6">
        <HeadingText3>Account Detail</HeadingText3>
      </div>
      <Card className="col-span-12 p-9">
        <div className="grid grid-cols-8 gap-y-3">
          <div className="col-span-1">
            <HeadingText4 className="font-bold">Email</HeadingText4>
          </div>
          <div className="col-span-7">
            {accountsSelector.currentAccount.profile.email}
          </div>
          <div className="col-span-1">
            <HeadingText4 className="font-bold">Name</HeadingText4>
          </div>
          <div className="col-span-7">
            {accountsSelector.currentAccount.profile.name}
          </div>
          <div className="col-span-1">
            <HeadingText4 className="font-bold">Role</HeadingText4>
          </div>
          <div className="col-span-7">
            <RoleTag
              role={accountsSelector.currentAccount.profile.role as any}
            />
          </div>
          <div className="col-span-1">
            <HeadingText4 className="font-bold">Citizen number</HeadingText4>
          </div>
          <div className="col-span-7">
            {accountsSelector.currentAccount.profile.citizenNumber}
          </div>
          <div className="col-span-1">
            <HeadingText4 className="font-bold">Phone number</HeadingText4>
          </div>
          <div className="col-span-7">
            {accountsSelector.currentAccount.profile.phoneNumber}
          </div>
          <div className="col-span-1">
            <HeadingText4 className="font-bold">Created at</HeadingText4>
          </div>
          <div className="col-span-7">
            {accountsSelector.currentAccount.createdAt}
          </div>
        </div>
        <div className="flex justify-end mt-9">
          {/* <Button color="danger" className="px-12 mr-4">
            Delete
          </Button> */}
          <OutlineButton
            className="px-12"
            onClick={() => history.push(`/manage-accounts/${id}/edit`)}
          >
            Edit
          </OutlineButton>
        </div>
      </Card>
    </Fragment>
  );
};

export default AccountDetailPage;
