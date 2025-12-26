export interface ICommand {
  name: string;
  description: string;
  usage?: string;
  aliases?: string[];
  minAdmin?: number;
  category?: string; // Acum este opțional, va fi completat de loader
  execute: (player: PlayerMp, args: string[], fullText: string) => void;
}

if (!(global as any).commandMap) {
  (global as any).commandMap = new Map<string, ICommand>();
  (global as any).aliasMap = new Map<string, string>();
}

const commands: Map<string, ICommand> = (global as any).commandMap;
const aliases: Map<string, string> = (global as any).aliasMap;

export function register(cmd: ICommand) {
  const mainName = cmd.name.toLowerCase();

  // Preluăm categoria din contextul global setat de manager în timpul încărcării
  if (!cmd.category && (global as any).currentLoadingCategory) {
    cmd.category = (global as any).currentLoadingCategory;
  }

  commands.set(mainName, cmd);

  if (cmd.aliases) {
    cmd.aliases.forEach((alias) => {
      aliases.set(alias.toLowerCase(), mainName);
    });
  }
}

export function findCommand(name: string): ICommand | undefined {
  const lowerName = name.toLowerCase();
  const mainName = aliases.get(lowerName) || lowerName;
  return commands.get(mainName);
}

export function getAllCommands(): ICommand[] {
  return Array.from(commands.values());
}
