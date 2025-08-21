import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Graph } from "../../utils/dfs";
const CategoryDFSExplorer: React.FC = () => {
    const categories = useSelector((state: RootState) => state.categories.list);
    const [startCategory, setStartCategory] = useState<string>("");
    const [dfsResult, setDfsResult] = useState<string[]>([]);

    const graph = useMemo(() => {
        const g = new Graph();

        // Add nodes
        categories.forEach((cat) => g.addNode(cat.id));

        // Add edges parent -> child
        categories.forEach((cat) => {
            if (cat.parentId !== undefined) {
                g.addEdge(cat.parentId, cat.id);
            }
        });

        return g;
    }, [categories]);

    const handleExplore = () => {
        if (startCategory) {
            const result = graph.dfs(Number(startCategory)); // convert dropdown string to number
            setDfsResult(result);
        }
    };
    console.log("first", dfsResult)
    return (
        <div className="max-w-xl mx-auto p-6 border rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">DFS Category Explorer</h2>

            <select
                value={startCategory}
                onChange={(e) => setStartCategory(e.target.value)}
                className="w-full border px-3 py-2 mb-4 rounded"
            >
                <option value="">Select category...</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>

            <button
                onClick={handleExplore}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Run DFS
            </button>

            {dfsResult.length > 0 && (

                <div className="mt-4">
                    <h3 className="font-semibold">Traversal Order:</h3>
                    <p className="mt-2">
                        {dfsResult.map((id) => {
                            const cat = categories.find((c) => c.id === id);
                            return (
                                <span key={id} className="inline-block bg-gray-200 px-2 py-1 m-1 rounded">
                                    {cat?.name}
                                </span>
                            );
                        })}
                    </p>
                </div>
            )}
        </div>
    );
};

export default CategoryDFSExplorer;
