CREATE FUNCTION public.before_update() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updatedAt = NOW();
  RETURN NEW;
END;
$$;
CREATE TABLE public.files (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    url text NOT NULL,
    "fileType" text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);
CREATE TABLE public."productFiles" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    "productId" uuid NOT NULL,
    "fileId" uuid NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);
COMMENT ON TABLE public."productFiles" IS 'Restricted deletes. Open to change it';
CREATE TABLE public."productTypes" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.products (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    title text,
    description text,
    "minPrice" integer,
    "maxPrice" integer,
    unit text,
    capacity integer NOT NULL,
    "leadTime" integer,
    "typeId" uuid NOT NULL,
    "supplierId" uuid NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "minOrderAmount" integer
);
COMMENT ON TABLE public.products IS 'leadTime is measured in milliseconds';
CREATE TABLE public.suppliers (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    email text NOT NULL,
    "firstName" text,
    "lastName" text,
    country text,
    zip text,
    street text,
    "vatNumber" text,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    published boolean DEFAULT false NOT NULL,
    "companyName" text NOT NULL
);
ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_id_key UNIQUE (id);
ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_url_key UNIQUE (url);
ALTER TABLE ONLY public."productFiles"
    ADD CONSTRAINT "productFiles_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."productTypes"
    ADD CONSTRAINT "productType_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.products
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT supplier_email_key1 UNIQUE (email);
ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT supplier_id_key1 UNIQUE (id);
ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (id);
CREATE TRIGGER set_before_update BEFORE UPDATE ON public."productTypes" FOR EACH ROW EXECUTE FUNCTION public.before_update();
CREATE TRIGGER set_before_update BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.before_update();
CREATE TRIGGER set_before_update BEFORE UPDATE ON public.suppliers FOR EACH ROW EXECUTE FUNCTION public.before_update();
ALTER TABLE ONLY public."productFiles"
    ADD CONSTRAINT "productFiles_file_fkey" FOREIGN KEY ("fileId") REFERENCES public.files(id) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE ONLY public."productFiles"
    ADD CONSTRAINT "productFiles_product_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE ONLY public.products
    ADD CONSTRAINT product_supplier_fkey FOREIGN KEY ("supplierId") REFERENCES public.suppliers(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.products
    ADD CONSTRAINT product_type_fkey FOREIGN KEY ("typeId") REFERENCES public."productTypes"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
