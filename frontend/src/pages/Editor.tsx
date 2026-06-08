import { useEffect } from "react";
import { generateDiagram } from "../services/api";
import CanvasView from "../canvas/CanvasView";

export default function Editor() {
    useEffect(() => {
        async function test() {
            const data = await generateDiagram();

            console.log(data);
        }

        test();
    }, []);

    return <CanvasView />;
}