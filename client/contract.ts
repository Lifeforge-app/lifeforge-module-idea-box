export type EndpointContainersList_OutputOK = {
  id: string;
  name: string;
  icon: string;
  color: string;
  cover: string;
  pinned: boolean;
  hidden: boolean;
  text_count: number;
  link_count: number;
  image_count: number;
}[];
export type EndpointContainersRemove_OutputNO_CONTENT = void;
export type EndpointContainersValidate_OutputOK = boolean;
export type EndpointFoldersList_OutputOK = {
  id: string;
  container: string;
  name: string;
  color: string;
  icon: string;
  parent: string;
}[];
export type EndpointFoldersRemove_OutputNO_CONTENT = void;
export type EndpointIdeasCreate_InputBody =
  | {
      type: "text";
      container: string;
      folder?: string;
      tags: string[];
      content: string;
    }
  | {
      type: "image";
      container: string;
      folder?: string;
      tags: string[];
    }
  | {
      type: "link";
      container: string;
      folder?: string;
      tags: string[];
      link: string;
    };
export type EndpointIdeasList_OutputOK = (
  | {
      id: string;
      type: "text";
      container: string;
      folder: string;
      pinned: boolean;
      archived: boolean;
      tags: string[];
      created: string;
      updated: string;
      content: string;
    }
  | {
      id: string;
      type: "image";
      container: string;
      folder: string;
      pinned: boolean;
      archived: boolean;
      tags: string[];
      created: string;
      updated: string;
      image: string;
    }
  | {
      id: string;
      type: "link";
      container: string;
      folder: string;
      pinned: boolean;
      archived: boolean;
      tags: string[];
      created: string;
      updated: string;
      link: string;
    }
)[];
export type EndpointIdeasMoveTo_OutputNO_CONTENT = void;
export type EndpointIdeasRemove_OutputNO_CONTENT = void;
export type EndpointIdeasRemoveFromParent_OutputNO_CONTENT = void;
export type EndpointIdeasUpdate_InputBody =
  | {
      type: "text";
      tags: string[];
      content: string;
    }
  | {
      type: "image";
      tags: string[];
    }
  | {
      type: "link";
      tags: string[];
      link: string;
    };
export type EndpointTagsList_OutputOK = {
  id: string;
  name: string;
  icon: string;
  color: string;
  container: string;
  amount: number;
}[];
export type EndpointTagsRemove_OutputNO_CONTENT = void;
export type EndpointMiscCheckValid_OutputOK = boolean;
export type EndpointMiscSearch_OutputOK = {
  id: string;
  type: "text";
  container: string;
  folder: string;
  pinned: boolean;
  archived: boolean;
  tags: string[];
  created: string;
  updated: string;
  content: string;
  fullPath: string;
  expand: {
    folder?: {
      id: string;
      container: string;
      name: string;
      color: string;
      icon: string;
      parent: string;
    };
  };
}[];

export interface Contract {
  containers: {
    create: EndpointContainersCreate;
    list: EndpointContainersList;
    remove: EndpointContainersRemove;
    toggleHide: EndpointContainersToggleHide;
    togglePin: EndpointContainersTogglePin;
    update: EndpointContainersUpdate;
    validate: EndpointContainersValidate;
  };
  folders: {
    create: EndpointFoldersCreate;
    list: EndpointFoldersList;
    moveTo: EndpointFoldersMoveTo;
    remove: EndpointFoldersRemove;
    removeFromParent: EndpointFoldersRemoveFromParent;
    update: EndpointFoldersUpdate;
  };
  ideas: {
    archive: EndpointIdeasArchive;
    create: EndpointIdeasCreate;
    list: EndpointIdeasList;
    moveTo: EndpointIdeasMoveTo;
    pin: EndpointIdeasPin;
    remove: EndpointIdeasRemove;
    removeFromParent: EndpointIdeasRemoveFromParent;
    update: EndpointIdeasUpdate;
  };
  tags: {
    create: EndpointTagsCreate;
    list: EndpointTagsList;
    remove: EndpointTagsRemove;
    update: EndpointTagsUpdate;
  };
  misc: {
    checkValid: EndpointMiscCheckValid;
    getOgData: EndpointMiscGetOgData;
    getPath: EndpointMiscGetPath;
    search: EndpointMiscSearch;
  };
}
export interface EndpointContainersCreate {
  method: "post";
  input: {
    body?: EndpointContainersCreate_InputBody;
  };
  output: {
    CREATED: EndpointContainersCreate_OutputCREATED;
  };
  media: {cover: {optional: true}};
}
export interface EndpointContainersCreate_InputBody {
  name: string;
  icon: string;
  color: string;
}
export interface EndpointContainersCreate_OutputCREATED {
  id: string;
  name: string;
  icon: string;
  color: string;
  cover: string;
  pinned: boolean;
  hidden: boolean;
}
export interface EndpointContainersList {
  method: "get";
  input: {
    query?: EndpointContainersList_InputQuery;
  };
  output: {
    OK: EndpointContainersList_OutputOK;
  };
  media: null;
}
export interface EndpointContainersList_InputQuery {
  hidden?: string;
}
export interface EndpointContainersRemove {
  method: "post";
  input: {
    query?: EndpointContainersRemove_InputQuery;
  };
  output: {
    NO_CONTENT: EndpointContainersRemove_OutputNO_CONTENT;
  };
  media: null;
}
export interface EndpointContainersRemove_InputQuery {
  id: string;
}
export interface EndpointContainersToggleHide {
  method: "post";
  input: {
    query?: EndpointContainersToggleHide_InputQuery;
  };
  output: {
    OK: EndpointContainersToggleHide_OutputOK;
  };
  media: null;
}
export interface EndpointContainersToggleHide_InputQuery {
  id: string;
}
export interface EndpointContainersToggleHide_OutputOK {
  id: string;
  name: string;
  icon: string;
  color: string;
  cover: string;
  pinned: boolean;
  hidden: boolean;
}
export interface EndpointContainersTogglePin {
  method: "post";
  input: {
    query?: EndpointContainersTogglePin_InputQuery;
  };
  output: {
    OK: EndpointContainersTogglePin_OutputOK;
  };
  media: null;
}
export interface EndpointContainersTogglePin_InputQuery {
  id: string;
}
export interface EndpointContainersTogglePin_OutputOK {
  id: string;
  name: string;
  icon: string;
  color: string;
  cover: string;
  pinned: boolean;
  hidden: boolean;
}
export interface EndpointContainersUpdate {
  method: "post";
  input: {
    query?: EndpointContainersUpdate_InputQuery;
    body?: EndpointContainersUpdate_InputBody;
  };
  output: {
    OK: EndpointContainersUpdate_OutputOK;
  };
  media: {cover: {optional: true}};
}
export interface EndpointContainersUpdate_InputQuery {
  id: string;
}
export interface EndpointContainersUpdate_InputBody {
  name: string;
  icon: string;
  color: string;
}
export interface EndpointContainersUpdate_OutputOK {
  id: string;
  name: string;
  icon: string;
  color: string;
  cover: string;
  pinned: boolean;
  hidden: boolean;
}
export interface EndpointContainersValidate {
  method: "get";
  input: {
    query?: EndpointContainersValidate_InputQuery;
  };
  output: {
    OK: EndpointContainersValidate_OutputOK;
  };
  media: null;
}
export interface EndpointContainersValidate_InputQuery {
  id: string;
}
export interface EndpointFoldersCreate {
  method: "post";
  input: {
    body?: EndpointFoldersCreate_InputBody;
  };
  output: {
    CREATED: EndpointFoldersCreate_OutputCREATED;
  };
  media: null;
}
export interface EndpointFoldersCreate_InputBody {
  container: string;
  name: string;
  color: string;
  icon: string;
  parent?: string;
}
export interface EndpointFoldersCreate_OutputCREATED {
  id: string;
  container: string;
  name: string;
  color: string;
  icon: string;
  parent: string;
}
export interface EndpointFoldersList {
  method: "get";
  input: {
    query?: EndpointFoldersList_InputQuery;
  };
  output: {
    OK: EndpointFoldersList_OutputOK;
  };
  media: null;
}
export interface EndpointFoldersList_InputQuery {
  container: string;
  path: string;
}
export interface EndpointFoldersMoveTo {
  method: "post";
  input: {
    query?: EndpointFoldersMoveTo_InputQuery;
    body?: EndpointFoldersMoveTo_InputBody;
  };
  output: {
    OK: EndpointFoldersMoveTo_OutputOK;
  };
  media: null;
}
export interface EndpointFoldersMoveTo_InputQuery {
  id: string;
}
export interface EndpointFoldersMoveTo_InputBody {
  target: string;
}
export interface EndpointFoldersMoveTo_OutputOK {
  id: string;
  container: string;
  name: string;
  color: string;
  icon: string;
  parent: string;
}
export interface EndpointFoldersRemove {
  method: "post";
  input: {
    query?: EndpointFoldersRemove_InputQuery;
  };
  output: {
    NO_CONTENT: EndpointFoldersRemove_OutputNO_CONTENT;
  };
  media: null;
}
export interface EndpointFoldersRemove_InputQuery {
  id: string;
}
export interface EndpointFoldersRemoveFromParent {
  method: "post";
  input: {
    query?: EndpointFoldersRemoveFromParent_InputQuery;
  };
  output: {
    OK: EndpointFoldersRemoveFromParent_OutputOK;
  };
  media: null;
}
export interface EndpointFoldersRemoveFromParent_InputQuery {
  id: string;
}
export interface EndpointFoldersRemoveFromParent_OutputOK {
  id: string;
  container: string;
  name: string;
  color: string;
  icon: string;
  parent: string;
}
export interface EndpointFoldersUpdate {
  method: "post";
  input: {
    query?: EndpointFoldersUpdate_InputQuery;
    body?: EndpointFoldersUpdate_InputBody;
  };
  output: {
    OK: EndpointFoldersUpdate_OutputOK;
  };
  media: null;
}
export interface EndpointFoldersUpdate_InputQuery {
  id: string;
}
export interface EndpointFoldersUpdate_InputBody {
  name: string;
  color: string;
  icon: string;
}
export interface EndpointFoldersUpdate_OutputOK {
  id: string;
  container: string;
  name: string;
  color: string;
  icon: string;
  parent: string;
}
export interface EndpointIdeasArchive {
  method: "post";
  input: {
    query?: EndpointIdeasArchive_InputQuery;
  };
  output: {
    OK: EndpointIdeasArchive_OutputOK;
  };
  media: null;
}
export interface EndpointIdeasArchive_InputQuery {
  id: string;
}
export interface EndpointIdeasArchive_OutputOK {
  id: string;
  type: "text" | "image" | "link";
  container: string;
  folder: string;
  pinned: boolean;
  archived: boolean;
  tags: string[];
  created: string;
  updated: string;
}
export interface EndpointIdeasCreate {
  method: "post";
  input: {
    body?: EndpointIdeasCreate_InputBody;
  };
  output: {
    CREATED: EndpointIdeasCreate_OutputCREATED;
  };
  media: {image: {optional: true}};
}
export interface EndpointIdeasCreate_OutputCREATED {
  id: string;
  type: "text" | "image" | "link";
  container: string;
  folder: string;
  pinned: boolean;
  archived: boolean;
  tags: string[];
  created: string;
  updated: string;
}
export interface EndpointIdeasList {
  method: "get";
  input: {
    query?: EndpointIdeasList_InputQuery;
  };
  output: {
    OK: EndpointIdeasList_OutputOK;
  };
  media: null;
}
export interface EndpointIdeasList_InputQuery {
  container: string;
  path: string;
  archived?: string;
}
export interface EndpointIdeasMoveTo {
  method: "post";
  input: {
    query?: EndpointIdeasMoveTo_InputQuery;
    body?: EndpointIdeasMoveTo_InputBody;
  };
  output: {
    NO_CONTENT: EndpointIdeasMoveTo_OutputNO_CONTENT;
  };
  media: null;
}
export interface EndpointIdeasMoveTo_InputQuery {
  id: string;
}
export interface EndpointIdeasMoveTo_InputBody {
  target: string;
}
export interface EndpointIdeasPin {
  method: "post";
  input: {
    query?: EndpointIdeasPin_InputQuery;
  };
  output: {
    OK: EndpointIdeasPin_OutputOK;
  };
  media: null;
}
export interface EndpointIdeasPin_InputQuery {
  id: string;
}
export interface EndpointIdeasPin_OutputOK {
  id: string;
  type: "text" | "image" | "link";
  container: string;
  folder: string;
  pinned: boolean;
  archived: boolean;
  tags: string[];
  created: string;
  updated: string;
}
export interface EndpointIdeasRemove {
  method: "post";
  input: {
    query?: EndpointIdeasRemove_InputQuery;
  };
  output: {
    NO_CONTENT: EndpointIdeasRemove_OutputNO_CONTENT;
  };
  media: null;
}
export interface EndpointIdeasRemove_InputQuery {
  id: string;
}
export interface EndpointIdeasRemoveFromParent {
  method: "post";
  input: {
    query?: EndpointIdeasRemoveFromParent_InputQuery;
  };
  output: {
    NO_CONTENT: EndpointIdeasRemoveFromParent_OutputNO_CONTENT;
  };
  media: null;
}
export interface EndpointIdeasRemoveFromParent_InputQuery {
  id: string;
}
export interface EndpointIdeasUpdate {
  method: "post";
  input: {
    query?: EndpointIdeasUpdate_InputQuery;
    body?: EndpointIdeasUpdate_InputBody;
  };
  output: {
    OK: EndpointIdeasUpdate_OutputOK;
  };
  media: {image: {optional: true}};
}
export interface EndpointIdeasUpdate_InputQuery {
  id: string;
}
export interface EndpointIdeasUpdate_OutputOK {
  id: string;
  type: "text" | "image" | "link";
  container: string;
  folder: string;
  pinned: boolean;
  archived: boolean;
  tags: string[];
  created: string;
  updated: string;
}
export interface EndpointTagsCreate {
  method: "post";
  input: {
    body?: EndpointTagsCreate_InputBody;
  };
  output: {
    CREATED: EndpointTagsCreate_OutputCREATED;
  };
  media: null;
}
export interface EndpointTagsCreate_InputBody {
  name: string;
  icon: string;
  color: string;
  container: string;
}
export interface EndpointTagsCreate_OutputCREATED {
  id: string;
  name: string;
  icon: string;
  color: string;
  container: string;
}
export interface EndpointTagsList {
  method: "get";
  input: {
    query?: EndpointTagsList_InputQuery;
  };
  output: {
    OK: EndpointTagsList_OutputOK;
  };
  media: null;
}
export interface EndpointTagsList_InputQuery {
  container: string;
}
export interface EndpointTagsRemove {
  method: "post";
  input: {
    query?: EndpointTagsRemove_InputQuery;
  };
  output: {
    NO_CONTENT: EndpointTagsRemove_OutputNO_CONTENT;
  };
  media: null;
}
export interface EndpointTagsRemove_InputQuery {
  id: string;
}
export interface EndpointTagsUpdate {
  method: "post";
  input: {
    query?: EndpointTagsUpdate_InputQuery;
    body?: EndpointTagsUpdate_InputBody;
  };
  output: {
    OK: EndpointTagsUpdate_OutputOK;
  };
  media: null;
}
export interface EndpointTagsUpdate_InputQuery {
  id: string;
}
export interface EndpointTagsUpdate_InputBody {
  name: string;
  icon: string;
  color: string;
}
export interface EndpointTagsUpdate_OutputOK {
  id: string;
  name: string;
  icon: string;
  color: string;
  container: string;
}
export interface EndpointMiscCheckValid {
  method: "get";
  input: {
    query?: EndpointMiscCheckValid_InputQuery;
  };
  output: {
    OK: EndpointMiscCheckValid_OutputOK;
  };
  media: null;
}
export interface EndpointMiscCheckValid_InputQuery {
  container: string;
  path: string;
}
export interface EndpointMiscGetOgData {
  method: "get";
  input: {
    query?: EndpointMiscGetOgData_InputQuery;
  };
  output: {
    OK: EndpointMiscGetOgData_OutputOK;
  };
  media: null;
}
export interface EndpointMiscGetOgData_InputQuery {
  id: string;
}
export interface EndpointMiscGetOgData_OutputOK {
  ogTitle?: string;
  ogDescription?: string;
  ogSiteName?: string;
  ogImage?: {
    url: string;
    width?: number;
    height?: number;
    type?: string;
  }[];
}
export interface EndpointMiscGetPath {
  method: "get";
  input: {
    query?: EndpointMiscGetPath_InputQuery;
  };
  output: {
    OK: EndpointMiscGetPath_OutputOK;
  };
  media: null;
}
export interface EndpointMiscGetPath_InputQuery {
  container: string;
  folder?: string;
}
export interface EndpointMiscGetPath_OutputOK {
  container: {
    id: string;
    name: string;
    icon: string;
    color: string;
    cover: string;
    pinned: boolean;
    hidden: boolean;
  };
  route: {
    id: string;
    container: string;
    name: string;
    color: string;
    icon: string;
    parent: string;
  }[];
}
export interface EndpointMiscSearch {
  method: "get";
  input: {
    query?: EndpointMiscSearch_InputQuery;
  };
  output: {
    OK: EndpointMiscSearch_OutputOK;
  };
  media: null;
}
export interface EndpointMiscSearch_InputQuery {
  q: string;
  container: string;
  tags?: string;
  folder?: string;
}
