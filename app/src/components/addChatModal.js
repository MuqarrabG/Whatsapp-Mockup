//Foreign Code credit the author required
//https://github.com/hiteshchoudhary/apihub
//This codes logic has been heavily modified so it work with our code.

import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Switch, Transition } from "@headlessui/react";
import { createChat, getAvailableUsers } from "../services/api";
//import { requestHandler } from "../../utils";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";
import {
  UserGroupIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import makeToast from "./Toaster";

const AddChatModal = ({ user, open, onClose, onSuccess }) => {
  const [users, setUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [groupParticipants, setGroupParticipants] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [creatingChat, setCreatingChat] = useState(false);
  const [members, setMembers] = useState([]);

  const classNames = (...className) => {
    return className.filter(Boolean).join(" ");
  };

  const morphArray = (originalArray) => {
    return originalArray.map((item) => {
      return {
        id: item.userId,
        nickname: item.username,
      };
    });
  };

  const getUsers = async () => {
    getAvailableUsers(user.userId).then((res) => {
      const { data } = res;
      setUsers(data || []);
    });
  };
  useEffect(() => {
    if (selectedUser.length > 0) {
      setMembers(morphArray([...selectedUser, user]));
    }
  }, [selectedUser, user]);

  useEffect(() => {
    if (groupParticipants.length > 0) {
      setMembers(morphArray([...groupParticipants, user]));
    }
  }, [groupParticipants, user]);

  const createNewChat = () => {
    if (selectedUser.length === 0) {
      makeToast("error", "Please select a user");
      return;
    }
    const name = user.username + "-" + selectedUser[0].username;
    createChat(name, members)
      .then((res) => {
        makeToast("success", res.data);
        onSuccess()
        handleClose();
      })
      .catch((error) => {
        makeToast("error", error.response.data.error);
      });
    console.log("New chat created", name, members);
  };

  const createNewGroupChat = async () => {
    if (!groupName) return makeToast("error", "Group name is required");
    if (!groupParticipants.length || groupParticipants.length < 2)
      return makeToast("error", "There must be at least 2 group participants");
    createChat(groupName, members)
      .then((res) => {
        makeToast("success", res.data);
        onSuccess()
        handleClose();
      })
      .catch((error) => {
        makeToast("error", error.response.data.error);
      });
    console.log("New Group Chat", members, isGroupChat, groupName);
  };

  const handleClose = () => {
    setUsers([]);
    setSelectedUser([]);
    setGroupName("");
    setGroupParticipants([]);
    setMembers([])
    setIsGroupChat(false);
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    getUsers();
  }, [open]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-visible">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-x-hidden rounded-lg bg-dark px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6"
                style={{
                  overflow: "inherit",
                }}
              >
                <div>
                  <div className="flex justify-between items-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-white"
                    >
                      Create chat
                    </Dialog.Title>
                    <button
                      type="button"
                      className="rounded-md bg-transparent text-zinc-400 hover:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2"
                      onClick={() => handleClose()}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div>
                  <Switch.Group as="div" className="flex items-center my-5">
                    <Switch
                      checked={isGroupChat}
                      onChange={setIsGroupChat}
                      className={classNames(
                        isGroupChat ? "bg-secondary" : "bg-zinc-200",
                        "relative outline outline-[1px] outline-white inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-0"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          isGroupChat
                            ? "translate-x-5 bg-success"
                            : "translate-x-0 bg-white",
                          "pointer-events-none inline-block h-5 w-5 transform rounded-full shadow ring-0 transition duration-200 ease-in-out"
                        )}
                      />
                    </Switch>
                    <Switch.Label as="span" className="ml-3 text-sm">
                      <span
                        className={classNames(
                          "font-medium text-white",
                          isGroupChat ? "" : "opacity-40"
                        )}
                      >
                        Is it a group chat?
                      </span>{" "}
                    </Switch.Label>
                  </Switch.Group>
                  {isGroupChat ? (
                    <div className="my-5">
                      <Input
                        placeholder={"Enter a group name..."}
                        value={groupName}
                        onChange={(e) => {
                          setGroupName(e.target.value);
                        }}
                      />
                    </div>
                  ) : null}
                  <div className="my-5">
                    <Select
                      placeholder={
                        isGroupChat
                          ? "Select group participants..."
                          : "Select a user to chat..."
                      }
                      value={isGroupChat ? "" : selectedUser || ""}
                      options={users.map((user) => {
                        return {
                          label: user.username,
                          value: user.userId,
                        };
                      })}
                      onChange={({ value, label }) => {
                        const newParticipant = {
                          userId: value,
                          username: label,
                        };
                        if (isGroupChat) {
                          // if user is creating a group chat track the participants in an array
                          const exists = groupParticipants.some(
                            (participant) =>
                              participant.userId === newParticipant.userId
                          );

                          if (!exists) {
                            // if user is creating a group chat, track the participants in an array
                            setGroupParticipants([
                              ...groupParticipants,
                              newParticipant,
                            ]);
                          }
                        } else {
                          setSelectedUser([newParticipant]);
                          // if user is creating normal chat just get a single user
                        }
                      }}
                    />
                  </div>
                  {isGroupChat ? (
                    <div className="my-5">
                      <span
                        className={classNames(
                          "font-medium text-white inline-flex items-center"
                        )}
                      >
                        <UserGroupIcon className="h-5 w-5 mr-2" /> Selected
                        participants
                      </span>{" "}
                      <div className="flex justify-start items-center flex-wrap gap-2 mt-3">
                        {groupParticipants.map((participant) => {
                          return (
                            <div
                              className="inline-flex bg-secondary rounded-full p-2 border-[1px] border-zinc-400 items-center gap-2"
                              key={participant.userId}
                            >
                              {/* <img
                                  className="h-6 w-6 rounded-full object-cover"
                                  src={participant.avatar.url}
                                  alt="sdgfdsfsgs"
                                /> */}
                              <ion-icon
                                name="person-circle-outline"
                                class="h-6 w-6 text-white rounded-full object-cover"
                              ></ion-icon>
                              <p className="text-white">
                                {participant.username}
                              </p>
                              <XCircleIcon
                                role="button"
                                className="w-6 h-6 text-white hover:text-red-600 cursor-pointer"
                                onClick={() => {
                                  setGroupParticipants(
                                    groupParticipants.filter(
                                      (p) => p.userId !== participant.userId
                                    )
                                  );
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="mt-5 flex justify-between items-center gap-4">
                  <Button
                    disabled={creatingChat}
                    severity={"secondary"}
                    onClick={handleClose}
                    className="w-1/2"
                  >
                    Close
                  </Button>
                  <Button
                    disabled={creatingChat}
                    onClick={isGroupChat ? createNewGroupChat : createNewChat}
                    className="w-1/2"
                  >
                    Create
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddChatModal;
