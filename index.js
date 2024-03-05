import * as trees from "@hexlet/immutable-fs-trees";
import _ from "lodash";

const tree = trees.mkdir(".",
    [
        trees.mkdir("dir1", [
            trees.mkfile("image.jpg", { owner: "me" })
        ], { owner: "me" }),
        trees.mkfile("file", { owner: "me" }),
        trees.mkdir("dir2", [
            trees.mkfile("doc.docx", { owner: "me" })
        ], { owner: "me" }),
    ], { owner: "me" }
);
console.log(JSON.stringify(tree) + "\n");


const changeOwner = (node, newOwner) => {
    const name = trees.getName(node);
    const newMeta = _.cloneDeep(trees.getMeta(node));
    newMeta.owner = newOwner;

    if (trees.isFile(node)) {
        return trees.mkfile(name, newMeta);
    }

    const newChildren = trees.getChildren(node)
        .map((child) => changeOwner(child, newOwner));

    return trees.mkdir(name, newChildren, newMeta);
};


const newTree = changeOwner(tree, "you");
console.log(JSON.stringify(tree)+ "\n");
console.log(JSON.stringify(newTree)+ "\n");
