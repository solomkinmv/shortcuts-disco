import { useFetch } from '@raycast/utils';

export type KeyCodes = Map<string, string>;

interface IncomingKeyCodes {
    keyCodes: [string, string][];
}

// todo: make it fetch only when cache expires or no cache
export default function useKeyCodes() {
    const useKeyCodesFetchResult = useFetch<IncomingKeyCodes>("https://shortcuts.solomk.in/key-codes.json", {
        keepPreviousData: false,
        // parseResponse: async (response) => {
            // const keyCodePairs = await response.json() as { keyCodes: [string, string][] };
            // console.log("useKeyCodes: parsing", keyCodePairs.keyCodes.length);
        // }
    });
    console.log("useKeyCodes: before return", useKeyCodesFetchResult);
    // const defaultValue: Map<string, string> = new Map();
    if (useKeyCodesFetchResult.isLoading) {
        return {
            isLoading: true,
            data: undefined
        };
    }
    return {
        isLoading: false,
        data: new Map(useKeyCodesFetchResult!.data!.keyCodes)
    };
    // return {
    //     isLoading: false,
    //     data: new Map<string, string>([
    //         ["a", "0"],
    //         ["b", "11"],
    //         ["c", "8"],
    //         ["d", "2"],
    //         ["e", "14"],
    //         ["f", "3"],
    //         ["g", "5"],
    //         ["h", "4"],
    //         ["i", "34"],
    //         ["j", "38"],
    //         ["k", "40"],
    //         ["l", "37"],
    //         ["m", "46"],
    //         ["n", "45"],
    //         ["o", "31"],
    //         ["p", "35"],
    //         ["q", "12"],
    //         ["r", "15"],
    //         ["s", "1"],
    //         ["t", "17"],
    //         ["u", "32"],
    //         ["v", "9"],
    //         ["w", "13"],
    //         ["x", "7"],
    //         ["y", "16"],
    //         ["z", "6"],
    //
    //         ["0", "27"],
    //         ["1", "18"],
    //         ["2", "19"],
    //         ["3", "20"],
    //         ["4", "21"],
    //         ["5", "23"],
    //         ["6", "22"],
    //         ["7", "26"],
    //         ["8", "28"],
    //         ["9", "25"],
    //
    //         ["f1", "122"],
    //         ["f2", "120"],
    //         ["f3", "99"],
    //         ["f4", "118"],
    //         ["f5", "96"],
    //         ["f6", "97"],
    //         ["f7", "98"],
    //         ["f8", "100"],
    //         ["f9", "101"],
    //         ["f10", "109"],
    //         ["f11", "103"],
    //         ["f12", "111"],
    //
    //         ["tab", "48"],
    //         ["esc", "53"],
    //         ["enter", "36"],
    //         ["capslock", "57"],
    //
    //         ["down", "125"],
    //         ["up", "126"],
    //         ["left", "123"],
    //         ["right", "124"],
    //
    //         ["pagedown", "121"],
    //         ["pageup", "116"],
    //         ["home", "115"],
    //         ["end", "119"],
    //
    //         ["`", "50"],
    //         ["\\", "42"],
    //         [";", "41"],
    //         ["/", "44"],
    //         ["-", "27"],
    //         ["+", "24"],
    //         ["[", "33"],
    //         ["]", "30"],
    //         [",", "43"],
    //         [".", "47"]
    //     ]),
    // };
}
