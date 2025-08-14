import React, { useEffect, useState } from "react";
import { UnionFind } from "../../../utils/unionFind";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
const categories = [
    { id: 0, name: "Analgesics" },
    { id: 1, name: "Pain Relief" },
    { id: 2, name: "Antifungals" },
    { id: 3, name: "Dermatology" },
];

const relations = [
    [0, 1], // Analgesics ↔ Pain Relief
    [2, 3], // Antifungals ↔ Dermatology
];

export const CategoryGroupingPage: React.FC = () => {
    const categories = useSelector((state: RootState) => state.categories.list);
    const [groups, setGroups] = useState<Record<number, number>>({});
   useEffect(() => {
    if (categories.length === 0) return;

    // Map category IDs to array index for UF
    const idToIndex: Record<number, number> = {};
    categories.forEach((cat, index) => {
      idToIndex[cat.id] = index;
    });

    const uf = new UnionFind(categories.length);

    // Union each child with its parent
    categories.forEach((cat) => {
      if (cat.parentId !== null) {
        uf.union(idToIndex[cat.id], idToIndex[cat.parentId]);
      }
    });

    // Store group IDs
    const groupMap: Record<number, number> = {};
    categories.forEach((cat) => {
      groupMap[cat.id] = uf.find(idToIndex[cat.id]);
    });

    setGroups(groupMap);
  }, [categories]);
  const colors = ["#f0f9ff", "#fef9c3", "#ecfccb", "#fce7f3"];
    return (
        <div className="p-4">
      <h2 className="font-bold mb-3">Category Groups</h2>
      {categories.map((cat) => (
        <div
          key={cat.id}
          style={{
            background: colors[groups[cat.id] % colors.length],
            paddingLeft: cat.parentId ? "20px" : "0px",
          }}
          className="mb-1 p-1 rounded"
        >
          {cat.name}
        </div>
      ))}
    </div>
    );
};