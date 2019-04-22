
export class CmisStatementBuilder {
    
    public static buildCmisStatement(statement:string, filters:string, sortyBy:string):string {

        const test = "SELECT lingo:text, cmis:name FROM lingo:text ORDER BY lingo:text";
        let selectFromRegEx = /(SELECT\s*(\w*:\w*)(,\s*\w*:\w*)*\s*FROM)/gi
        let replaced = test.replace(selectFromRegEx, "$1 hahaha");
        console.log("Replaced: " + replaced)

        // return replaced 
        return statement
    }
}